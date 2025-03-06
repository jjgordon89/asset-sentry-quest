import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '@/hooks/use-form-validation';

interface InspectionTemplate {
  id: string;
  name: string;
  description: string;
  items: {
    question: string;
    required: boolean;
    type: 'pass-fail' | 'multiple-choice' | 'text';
    options?: string[];
    defaultStatus?: 'pass' | 'fail' | 'na';
    defaultPriority?: 'low' | 'medium' | 'high' | null;
  }[];
}

export const InspectionTemplates = () => {
  const [templates, setTemplates] = useState<InspectionTemplate[]>([]);

  return (
    <div className="pt-20 pb-16 container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inspection Templates</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage reusable inspection form templates
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/inspection-templates/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Template
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {template.items.length} inspection items
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/inspection-templates/${template.id}/edit`}>
                    Edit Template
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/inspections/new?templateId=${template.id}`}>
                    Use Template
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <Card className="mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">
              No inspection templates found
            </p>
            <Button asChild>
              <Link to="/inspection-templates/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create your first template
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InspectionTemplates;