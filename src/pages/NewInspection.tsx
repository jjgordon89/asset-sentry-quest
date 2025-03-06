import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { inspectionsApi } from '@/services/api';
import { useFormValidation, inspectionSchema } from '@/hooks/use-form-validation';
import { mockAssets } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { ApiError } from '@/services/api';

export const NewInspection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const assetId = searchParams.get('assetId');
  const [selectedAsset, setSelectedAsset] = useState<string>(assetId || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    validateField,
    getFieldError,
    setFieldTouched,
    handleSubmit,
    resetValidation
  } = useFormValidation(inspectionSchema);

  const [formState, setFormState] = useState({
    inspectionType: '',
    date: new Date().toISOString().split('T')[0],
    completedBy: '',
    status: 'pending',
    items: [{ question: '', status: 'na', priority: null, notes: null }],
    notes: ''
  });

  // Add validation for asset selection with cleanup
  useEffect(() => {
    const abortController = new AbortController();
    let isSubscribed = true;

    if (selectedAsset && isSubscribed) {
      validateField('assetId', selectedAsset, { signal: abortController.signal });
    }

    return () => {
      isSubscribed = false;
      abortController.abort();
      reset();
    };
  }, [selectedAsset, validateField, resetValidation]);

  const handleFormSubmit = async (formData: any) => {
    try {
      if (!selectedAsset) {
        toast({
          title: 'Validation Error',
          description: 'Please select an asset',
          variant: 'destructive',
        });
        return;
      }

      const inspectionData = {
        ...formData,
        assetId: selectedAsset,
        assetName: mockAssets.find(a => a.id === selectedAsset)?.name || ''
      };

      await inspectionsApi.createInspection(inspectionData);
      
      toast({
        title: 'Inspection created',
        description: 'New inspection has been successfully scheduled',
      });

      navigate(assetId ? `/assets/${assetId}` : '/inspections');
    } catch (error) {
      console.error('Failed to create inspection:', error);
      
      toast({
        title: 'Inspection creation failed',
        description: error instanceof ApiError 
          ? error.message 
          : 'Failed to create inspection. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  // Optimize inspection items management
  const updateInspectionItem = useCallback((index: number, field: keyof typeof formState.items[0], value: any) => {
    setFormState(prevState => {
      const newItems = [...prevState.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      // Reset priority when status is not 'fail'
      if (field === 'status' && value !== 'fail') {
        newItems[index].priority = null;
      }
      
      const updatedState = {
        ...prevState,
        items: newItems
      };

      // Validate immediately after state update
      validateField('items', newItems);
      
      return updatedState;
    });
  }, [validateField]);

  // Memoize form state to prevent unnecessary re-renders
  const memoizedFormState = useMemo(() => formState, [formState]);

  // Memoize the form submission handler
  const memoizedHandleFormSubmit = useCallback(async (formData: any) => {
    try {
      if (!selectedAsset) {
        toast({
          title: 'Validation Error',
          description: 'Please select an asset',
          variant: 'destructive',
        });
        return;
      }

      setIsSubmitting(true);
      const inspectionData = {
        ...formData,
        assetId: selectedAsset,
        assetName: mockAssets.find(a => a.id === selectedAsset)?.name || ''
      };

      await inspectionsApi.createInspection(inspectionData);
      
      toast({
        title: 'Inspection created',
        description: 'New inspection has been successfully scheduled',
      });

      navigate(assetId ? `/assets/${assetId}` : '/inspections');
    } catch (error) {
      console.error('Failed to create inspection:', error);
      
      toast({
        title: 'Inspection creation failed',
        description: error instanceof ApiError 
          ? error.message 
          : 'Failed to create inspection. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedAsset, assetId, navigate, toast]);

  return (
    <div className="pt-20 pb-16 container">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">New Inspection</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="asset">Asset</Label>
                <select
                  id="asset"
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Asset</option>
                  {mockAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>{asset.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="inspectionType">Inspection Type</Label>
                <Input
                  id="inspectionType"
                  value={formState.inspectionType}
                  onChange={(e) => {
                    setFormState({...formState, inspectionType: e.target.value});
                    validateField('inspectionType', e.target.value);
                  }}
                  onBlur={() => setFieldTouched('inspectionType')}
                />
                {getFieldError('inspectionType') && (
                  <p className="text-red-500 text-sm">{getFieldError('inspectionType')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formState.date}
                  onChange={(e) => {
                    setFormState({...formState, date: e.target.value});
                    validateField('date', e.target.value);
                  }}
                  onBlur={() => setFieldTouched('date')}
                />
                {getFieldError('date') && (
                  <p className="text-red-500 text-sm">{getFieldError('date')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="completedBy">Completed By</Label>
                <Input
                  id="completedBy"
                  value={formState.completedBy}
                  onChange={(e) => {
                    setFormState({...formState, completedBy: e.target.value});
                    validateField('completedBy', e.target.value);
                  }}
                  onBlur={() => setFieldTouched('completedBy')}
                />
                {getFieldError('completedBy') && (
                  <p className="text-red-500 text-sm">{getFieldError('completedBy')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formState.status}
                  onChange={(e) => {
                    setFormState({...formState, status: e.target.value});
                    validateField('status', e.target.value);
                  }}
                  className="w-full p-2 border rounded"
                  onBlur={() => setFieldTouched('status')}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {getFieldError('status') && (
                  <p className="text-red-500 text-sm">{getFieldError('status')}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Inspection Items</Label>
                {formState.items.map((item, index) => (
                  <div key={index} className="space-y-2 border p-4 rounded">
                    <div>
                      <Label htmlFor={`question-${index}`}>Question</Label>
                      <Input
                        id={`question-${index}`}
                        value={item.question}
                        onChange={(e) => {
                          const newItems = [...formState.items];
                          newItems[index].question = e.target.value;
                          setFormState({...formState, items: newItems});
                          validateField('items', newItems);
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`status-${index}`}>Item Status</Label>
                        <select
                          id={`status-${index}`}
                          value={item.status}
                          onChange={(e) => {
                            const newItems = [...formState.items];
                            newItems[index].status = e.target.value;
                            setFormState({...formState, items: newItems});
                            validateField('items', newItems);
                          }}
                          className="w-full p-2 border rounded"
                        >
                          <option value="pass">Pass</option>
                          <option value="fail">Fail</option>
                          <option value="na">N/A</option>
                        </select>
                      </div>
                      
                      {item.status === 'fail' && (
                        <div>
                          <Label htmlFor={`priority-${index}`}>Priority</Label>
                          <select
                            id={`priority-${index}`}
                            value={item.priority || ''}
                            onChange={(e) => {
                              const newItems = [...formState.items];
                              newItems[index].priority = e.target.value;
                              setFormState({...formState, items: newItems});
                              validateField('items', newItems);
                            }}
                            className="w-full p-2 border rounded"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`notes-${index}`}>Notes</Label>
                      <Input
                        id={`notes-${index}`}
                        value={item.notes || ''}
                        onChange={(e) => {
                          const newItems = [...formState.items];
                          newItems[index].notes = e.target.value;
                          setFormState({...formState, items: newItems});
                          validateField('items', newItems);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormState({
                      ...formState,
                      items: [...formState.items, { 
                        question: '', 
                        status: 'na',
                        priority: null,
                        notes: null 
                      }]
                    });
                  }}
                >
                  Add Item
                </Button>
              </div>

              <div>
                <Label htmlFor="notes">General Notes</Label>
                <Input
                  id="notes"
                  value={formState.notes}
                  onChange={(e) => {
                    setFormState({...formState, notes: e.target.value});
                    validateField('notes', e.target.value);
                  }}
                  onBlur={() => setFieldTouched('notes')}
                />
                {getFieldError('notes') && (
                  <p className="text-red-500 text-sm">{getFieldError('notes')}</p>
                )}
              </div>

            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Inspection
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};