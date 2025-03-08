import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CreateFile, createFileSchema } from "@/lib/schemas/file.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { search } from "@/api/data/events.data";
import { Button } from "../ui/button";
import { create } from "@/api/data/file.data";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select";

interface FileFormProps {
  onFileCreated: (fileId: string) => void;
  disabled?: boolean;
}

export default function FileForm({ ...props }: FileFormProps) {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const form = useForm<CreateFile>({
    resolver: zodResolver(createFileSchema),
  });

  const handleSubmit = async (data: CreateFile) => {
    setIsCreating(true);
    const file = await create(data);
    if (file) {
      props.onFileCreated(file.id);
      toast.success("Arquivo criado com sucesso");
      setIsCreating(false);
      return;
    }
    toast.error("Erro ao criar arquivo");
    setIsCreating(false);
  };

  const fetchLoadOptions = async (inputValue: string) => {
    const events = await search(inputValue);
    if (events) {
      return events.map((event) => ({
        value: event.id,
        label: event.name,
      }));
    }
    return [];
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-4">
                <FormLabel className="text-right">Nome</FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      "rounded-2xl bg-white bg-opacity-60",
                      form.formState.errors?.name && "border-destructive",
                      "col-span-5",
                    )}
                    type="text"
                    placeholder="Nome do Arquivo"
                    {...field}
                    required
                    onInput={() => {
                      if (form.formState.errors.name?.message) {
                        toast.error(form.formState.errors.name.message);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-4">
                <FormLabel className="text-right">Tipo do arquivo</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="col-span-5 rounded-2xl">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="certificate">Certificado</SelectItem>
                      <SelectItem value="image">Imagem</SelectItem>
                      <SelectItem value="document">Documento</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventId"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 items-center gap-4">
                <FormLabel className="text-right">Evento</FormLabel>
                <FormControl>
                  <AsyncSelect
                    className="col-span-5 rounded-2xl"
                    loadOptions={(input, callback) => {
                      if (input.length <= 3) {
                        callback([]);
                        return;
                      }

                      fetchLoadOptions(input)
                        .then((events) => {
                          if (events) {
                            callback(events);
                            return;
                          }
                          callback([]);
                        })
                        .catch(() => callback([]));
                    }}
                    onChange={(option: SingleValue<{
                      label: string;
                      value: string;
                    }>) => {
                      if (option) {
                        field.onChange(option?.value);
                      }
                    }}
                    isSearchable
                    cacheOptions
                    placeholder={"Selecione um evento"}
                    noOptionsMessage={() => "Nenhum evento encontrado"}
                    loadingMessage={() => "Buscando..."}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-900 text-white rounded-xl"
            disabled={isCreating || props.disabled}
          >
            {isCreating ? (
              <>
                <LoaderCircle className="animate-spin w-12 h-12" />
                Criando...
              </>
            ) : (
              "Criar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
