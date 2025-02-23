import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { EventCreateSchema, Event } from '@/lib/types';
import FormItemField from '../FormItemField';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';

interface EventsFormProps {
  form: UseFormReturn<EventCreateSchema>;
  onSubmit: (data: EventCreateSchema) => void;
  event?: Event;
}

export default function EventsForm({ form, onSubmit, event }: EventsFormProps) {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 p-4 space-x-4 max-md:space-x-0 max-md:flex max-md:flex-col max-md:space-y-4">
            <div className="p-4 flex flex-col space-y-3 border rounded-xl max-md:col-span-0">
              <div>
                <span className="font-bold">Diretrizes</span>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue={event ? event.name : ''}
                  render={({ field }) => (
                    <FormItemField
                      field={field}
                      label="Nome"
                      error={form.formState.errors.name?.message}
                      type="text"
                      placeholder="Nome do evento"
                    />
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="status"
                  defaultValue={event ? event.status : 'upcoming'}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={event ? event.status : 'upcoming'}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Defina um status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="upcoming">Próximo</SelectItem>
                            <SelectItem value="started">
                              Em andamento
                            </SelectItem>
                            <SelectItem value="ended">Finalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="p-4 border rounded-xl space-y-3">
              <div>
                <span className="font-bold">Diretrizes</span>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="eventStartDate"
                  defaultValue={event ? event.start_at.split('T')[0] : ''}
                  render={({ field }) => (
                    <FormItemField
                      field={{
                        ...field,
                      }}
                      label="Data de início"
                      error={form.formState.errors.eventStartDate?.message}
                      type="date"
                      placeholder="Data de início"
                    />
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="eventEndDate"
                  defaultValue={event ? event.end_at.split('T')[0] : ''}
                  render={({ field }) => (
                    <FormItemField
                      field={field}
                      label="Data de término"
                      error={form.formState.errors.eventEndDate?.message}
                      type="date"
                      placeholder="Data de término"
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-4 border rounded-xl space-y-3">
              <span className="font-bold">Diretrizes</span>
              <div>
                <FormField
                  control={form.control}
                  name="eventStartTime"
                  defaultValue={
                    event ? event.start_at.split('T')[1].slice(0, 5) : ''
                  }
                  render={({ field }) => (
                    <FormItemField
                      field={field}
                      label="Hora de início"
                      type="time"
                      placeholder="Hora de início"
                      error={form.formState.errors.eventStartTime?.message}
                    />
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="eventEndTime"
                  defaultValue={
                    event ? event.end_at.split('T')[1].slice(0, 5) : ''
                  }
                  render={({ field }) => (
                    <FormItemField
                      field={field}
                      label="Hora de término"
                      type="time"
                      placeholder="Hora de término"
                      error={form.formState.errors.eventEndTime?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-4 border rounded-xl space-y-3">
              <span className="font-bold">Diretrizes</span>
              <div>
              <FormField
                control={form.control}
                name="vagas"
                defaultValue={event ? event.vagas : 1}
                render={({ field }) => (
                  <FormItemField
                    field={{ ...field}}
                    label="Vagas"
                    error={form.formState.errors.vagas?.message}
                    type="number"
                    placeholder="Quantidade vagas do evento"
                  />
                )}
              />
            </div>
            </div>
            <div className="p-4 border rounded-xl space-y-3">
              <span className="font-bold">Diretrizes</span>
              <div>
              <FormField
                control={form.control}
                name="latitude"
                defaultValue={event ? event.latitude : 0}
                render={({ field }) => (
                  <FormItemField
                    field={{ ...field}}
                    label="Latitude"
                    error={form.formState.errors.latitude?.message}
                    type="number"
                    placeholder="Latitude do evento"
                  />
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="longitude"
                defaultValue={event ? event.longitude : 0}
                render={({ field }) => (
                  <FormItemField
                    field={{ ...field}}
                    label="Longitude"
                    error={form.formState.errors.longitude?.message}
                    type="number"
                    placeholder="Longitude do evento"
                  />
                )}
              />
            </div>
            </div>
          </div>

          <div className="flex max-md:flex-col max-md:space-y-3 max-md:space-x-1 justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border w-1/5 h-12 max-md:w-full"
              onClick={() => form.reset()}
            >
              Descartar criação
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="rounded-xl bg-sky-900 text-white w-1/5 h-12 hover:bg-sky-800 max-md:w-full"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
