import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { ControllerRenderProps } from 'react-hook-form';

interface FormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any>;
  label: string;
  error: string | undefined;
  type: string;
  placeholder: string;
}

export default function FormItemField({
  field,
  label,
  error,
  type,
  placeholder,
}: FormFieldProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          className={cn(
            'rounded-2xl bg-white bg-opacity-60',
            error && 'border-destructive'
          )}
          type={type}
          placeholder={placeholder}
          {...field}
          required
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
