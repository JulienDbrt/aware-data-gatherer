
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api, SourceCreate } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

const sourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Please enter a valid URL"),
  type: z.enum(["rss", "json"], {
    required_error: "Please select a source type",
  }),
});

interface SourceFormProps {
  onSuccess: () => void;
}

const SourceForm = ({ onSuccess }: SourceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof sourceSchema>>({
    resolver: zodResolver(sourceSchema),
    defaultValues: {
      name: "",
      url: "",
      type: "rss",
    },
  });

  const onSubmit = async (values: z.infer<typeof sourceSchema>) => {
    setIsSubmitting(true);
    try {
      const sourceData: SourceCreate = {
        name: values.name,
        url: values.url,
        type: values.type,
      };
      
      await api.sources.create(sourceData);
      toast({
        title: "Source added successfully",
        description: `${values.name} has been added to your sources.`,
      });
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error adding source:", error);
      // Error toast is handled inside the API call
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="TechCrunch" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive name for this content source
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://techcrunch.com/feed/" {...field} />
              </FormControl>
              <FormDescription>
                URL of the RSS feed or JSON API
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="rss">RSS Feed</SelectItem>
                  <SelectItem value="json">JSON API</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The type of content source
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Source"}
        </Button>
      </form>
    </Form>
  );
};

export default SourceForm;
