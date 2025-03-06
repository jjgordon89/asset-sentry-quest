import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useFormValidation } from '@/hooks/use-form-validation';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/services/api';
import { z } from 'zod';

const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional().default(""),
  items: z.array(
    z.object({
      question: z.string().min(1, 'Question is required'),
      required: z.boolean(),
      type: z.enum(['pass-fail', 'multiple-choice', 'text']),
      options: z.array(z.string()).optional(),
      defaultStatus: z.enum(['pass', 'fail', 'na']).optional(),
      defaultPriority: z.enum(['low', 'medium', 'high']).nullable().optional(),
    })
  ).min(1, 'At least one inspection item is required'),
});

type TemplateFormData = z.infer<typeof templateSchema>;

export const NewInspectionTemplate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { errors, validateField, getFieldError, handleSubmit, setFieldTouched } = useFormValidation(templateSchema);

  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    items: [{
      question: '',
      required: true,
      type: 'pass-fail',
      defaultStatus: 'na',
      defaultPriority: null,
    }],
  });

  const handleFormSubmit = async (data: TemplateFormData) => {
    try {
      setIsSubmitting(true);
      await apiRequest('/inspection-templates', 'POST', data);
      toast({
        title: 'Template created',
        description: 'New inspection template has been successfully created',
      });
      navigate('/inspection-templates');
    } catch (error) {
      console.error('Failed to save template:', error);
      toast({
        title: 'Failed to create template',
        description: error instanceof ApiError 
          ? error.message 
          : 'Failed to create template. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addInspectionItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          question: '',
          required: true,
          type: 'pass-fail',
          defaultStatus: 'na',
          defaultPriority: null,
        },
      ],
    });
  };

  const removeInspectionItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Clear options if type is changed from multiple-choice
    if (field === 'type' && value !== 'multiple-choice') {
      delete newItems[index].options;
    }
    
    // Reset defaultStatus if type is changed from pass-fail
    if (field === 'type' && value !== 'pass-fail') {
      delete newItems[index].defaultStatus;
    }
    
    setFormData({ ...formData, items: newItems });
    validateField('items', newItems);
    setFieldTouched('items');
    
    // Validate individual item
    const itemSchema = templateSchema.shape.items.element;
    try {
      itemSchema.parse(newItems[index]);
      // Clear existing errors for this item
      setErrors(prev => ({
        ...prev,
        [`items.${index}.question`]: undefined
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formatZodError(error);
        setErrors(prev => ({
          ...prev,
          ...Object.entries(formattedErrors).reduce((acc, [key, val]) => ({
            ...acc,
            [`items.${index}.${key}`]: val
          }), {})
        }));
      }
    }
};

  return (
    <div className="pt-20 pb-16 container">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create Inspection Template</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    validateField('name', e.target.value);
                  }}
                  onBlur={() => setFieldTouched('name')}
                  className={getFieldError('name') ? 'border-destructive' : ''}
                />
                {getFieldError('name') && (
                  <p className="text-destructive text-sm mt-1">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    validateField('description', e.target.value);
                  }}
                />
                {getFieldError('description') && (
                  <p className="text-red-500 text-sm">{getFieldError('description')}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Inspection Items</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInspectionItem}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {formData.items.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Label htmlFor={`question-${index}`}>Question</Label>
                          <Input
                            id={`question-${index}`}
                            value={item.question}
                            onChange={(e) => updateItem(index, 'question', e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => removeInspectionItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`type-${index}`}>Response Type</Label>
                          <select
                            id={`type-${index}`}
                            className="w-full p-2 border rounded"
                            value={item.type}
                            onChange={(e) => updateItem(index, 'type', e.target.value)}
                          >
                            <option value="pass-fail">Pass/Fail</option>
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="text">Text</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor={`required-${index}`}>Required</Label>
                          <select
                            id={`required-${index}`}
                            className="w-full p-2 border rounded"
                            value={item.required.toString()}
                            onChange={(e) => updateItem(index, 'required', e.target.value === 'true')}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>

                        {item.type === 'pass-fail' && (
                          <div>
                            <Label htmlFor={`defaultStatus-${index}`}>Default Status</Label>
                            <select
                              id={`defaultStatus-${index}`}
                              className="w-full p-2 border rounded"
                              value={item.defaultStatus || 'na'}
                              onChange={(e) => updateItem(index, 'defaultStatus', e.target.value)}
                            >
                              <option value="pass">Pass</option>
                              <option value="fail">Fail</option>
                              <option value="na">N/A</option>
                            </select>
                          </div>
                        )}

                        {item.type === 'multiple-choice' && (
                          <div className="col-span-2">
                            <Label>Options (comma-separated)</Label>
                            <Input
                              value={item.options?.join(', ') || ''}
                              onChange={(e) => updateItem(index, 'options', e.target.value.split(',').map(s => s.trim()))}
                              placeholder="Enter options separated by commas"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/inspection-templates')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Create Template'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewInspectionTemplate;