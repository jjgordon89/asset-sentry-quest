import { z } from 'zod';
import { useState, useCallback } from 'react';

type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
};

// Removed unused type FieldValidationOptions

type FormValidationOptions = {
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
  reValidateMode?: 'onChange' | 'onBlur';
};

export function useFormValidation<T>(schema: z.ZodType<T>, options: FormValidationOptions = {}) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Default options
  const { mode = 'onSubmit', reValidateMode = 'onChange' } = options;

  const validate = useCallback((data: unknown): ValidationResult<T> => {
    try {
      const parsedData = schema.parse(data);
      setErrors({});
      return { success: true, data: parsedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formatZodError(error);
        setErrors(formattedErrors);
        return { success: false, errors: formattedErrors };
      }
      return { success: false, errors: {} };
    }
  }, [schema]);

  const validateField = useCallback((field: string, value: unknown): boolean => {
    try {
      const fieldSchema = getFieldSchema(field);
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formatZodError(error);
        setErrors(prev => ({
          ...prev,
          ...Object.fromEntries(Object.entries(formattedErrors).filter(([k]) => k === field))
        }));
      }
      return false;
    }
  }, [schema]);



  const getFieldError = useCallback((field: string): string | undefined => {
    return errors[field]?.[0];
  }, [errors]);

  const hasErrors = useCallback((): boolean => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldTouched = useCallback((field: string, isTouched: boolean = true) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: isTouched
    }));
    setIsDirty(true);
  }, []);

  const handleSubmit = useCallback((onSubmit: (data: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitted(true);
      
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      const result = validate(data);
      if (result.success && result.data) {
        onSubmit(result.data);
      }
    };
  }, [validate]);

  const reset = useCallback(() => {
    setErrors({});
    setTouchedFields({});
    setIsDirty(false);
    setIsSubmitted(false);
  }, []);

  return {
    validate,
    validateField,
    errors,
    touchedFields,
    isDirty,
    isSubmitted,
    hasErrors,
    getFieldError,
    clearErrors,
    setFieldTouched,
    handleSubmit,
    reset,
  };
}

// Example asset schema
export const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  model: z.string().min(1, 'Model is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  category: z.string().min(1, 'Category is required'),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  purchasePrice: z.number().min(0, 'Purchase price must be a positive number'),
  location: z.string().min(1, 'Location is required'),
  department: z.string().min(1, 'Department is required'),
  status: z.enum(['active', 'inactive', 'maintenance', 'retired']),
  lastInspection: z.string().nullable(),
  nextInspection: z.string().nullable(),
  image: z.string().nullable(),
  notes: z.string().nullable(),
});

// Example inspection schema
export const inspectionSchema = z.object({
  assetId: z.string().min(1, 'Asset ID is required'),
  inspectionType: z.string().min(1, 'Inspection type is required'),
  date: z.string().min(1, 'Date is required'),
  completedBy: z.string().min(1, 'Completed by is required'),
  status: z.enum(['completed', 'pending', 'in-progress']),
  items: z.array(
    z.object({
      question: z.string().min(1, 'Question is required'),
      status: z.enum(['pass', 'fail', 'na']),
      priority: z.enum(['low', 'medium', 'high']).nullable(),
      notes: z.string().nullable(),
    })
  ),
  notes: z.string().nullable(),
  photos: z.array(z.string()),
});

const formatZodError = (error: z.ZodError): Record<string, string[]> => {
  const formattedErrors: Record<string, string[]> = {};
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!formattedErrors[path]) {
      formattedErrors[path] = [];
    }
    formattedErrors[path].push(err.message);
  });
  return formattedErrors;
};

const convertFormValue = (value: FormDataEntryValue): unknown => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  if (!isNaN(Number(value)) && value !== '') return Number(value);
  return value;
};