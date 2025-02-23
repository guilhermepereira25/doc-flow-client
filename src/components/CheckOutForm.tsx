import {
    Form,
    FormField,
  } from '@/components/ui/form';
  import { PresenceFormSchema, Presence } from '@/lib/types';
  import FormItemField from './FormItemField';
  import { UseFormReturn } from 'react-hook-form';
  import { getEvent } from '@/api/data/events.data';
  import { useState, useEffect } from "react";
  import { Event } from "@/lib/types"; 
  import { pdf } from "@react-pdf/renderer";
import CertificatePDF from "./RelatorioPresencaPdfForm";
import { saveAs } from "file-saver";
import useAuth from '@/hooks/useAuth';

  
  interface PresenceFormCheckouProps {
    form: UseFormReturn<PresenceFormSchema>;
    onSubmit: (data: PresenceFormSchema) => void;
    events: Event[];
    presences: Presence[];
  }

  const DEFAULT_RADIUS = 100; 
  function getDistanceFromLatLonInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; 
    const toRad = (value: number) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  const getUserPosition = (): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada pelo navegador.'));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
    });

    
function isWithinRange(
    userLat: number,
    userLon: number,
    eventLat: number,
    eventLon: number,
    radius: number = DEFAULT_RADIUS
  ): boolean {
    const distance = getDistanceFromLatLonInMeters(userLat, userLon, eventLat, eventLon);
    console.log(`Distância calculada: ${distance} metros`);
    return distance <= radius;
  }
  
  export default function PresencesForm({ form, onSubmit, events, presences }: PresenceFormCheckouProps) {

    const [eventExists, setEventExists] = useState<boolean | null>(null); 
    const [loading, setLoading] = useState(false); 
   const [event, setEvent] = useState<Event | null>(null);
   const [checkOutDate, setCheckOutDate] = useState<string>("");
   const [checkInDate, setCheckInDate]  = useState<string>("");
   const { user } = useAuth(); 


console.log("presenca inicial", presences);
console.log("evemto id", event?.id);

    const handleCheckOut = async (data: PresenceFormSchema) => {
        if (!event) {
            console.log("erro aqui");
          alert('Evento não encontrado.');
          return;
        }
    
        try {
          const position = await getUserPosition();
          const { latitude, longitude } = position.coords;
    
          if (isWithinRange(latitude, longitude, event.latitude, event.longitude)) {
            onSubmit(data);

            
             const certificateData = {
                nome: user?.fullName, 
                atividade: event.name,
                horas: calculateHoursDifference(checkInDate,checkOutDate),  
                dataInicio: formatDateTime(checkInDate),  
                dataFim: formatDateTime(checkOutDate),  
            };

            const blob = await pdf(<CertificatePDF {...certificateData} />).toBlob();
            saveAs(blob, "relatorioPresencaCheck.pdf");
          } else {
            alert('Você não está dentro da área do evento para realizar o check-in.');
          }
        } catch (error) {
          console.error(error);
          alert('Erro ao obter sua localização. Verifique se a geolocalização está habilitada.');
        }
      };

       
      const calculateHoursDifference = (start: string, end: string): number => {
        if (!start || !end) return 0; 
    
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        
        const diferencaMili = endDate.getTime() - startDate.getTime();
    
  
        const diferencaHora = diferencaMili / (1000 * 60 * 60);
    
        return Math.max(0, parseFloat(diferencaHora.toFixed(2))); 
    };

    const formatDateTime = (dateString: string): string => {
        if (!dateString) return "";
      
        const date = new Date(dateString);
      
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };
      
        return new Intl.DateTimeFormat("pt-BR", options).format(date);
      };

    const validateEventId = async (eventId: string) => {
        console.log("evento id", eventId);
    if (!eventId) return;
    
    

    setLoading(true); 
    try {
        console.log("antes da requisicao eventos");
     const event = await getEvent(eventId);
    
    if(event!=null)
    {
        console.log("depois da requisição");
       setEvent(event); 
        setEventExists(true); 
    }
    else
    {
      setEvent(null);
        setEventExists(false); 
    }
    
    } catch (error) {
    console.log("erro de teste", error);
    if(error)
     setEvent(null);
    setEventExists(false);
    } finally {
    setLoading(false); 
    }
};

useEffect(() => {
    const now = new Date();

    if (!event?.end_at) {
      
      const datePart = now.toISOString().split("T")[0]; 
      const timePart = now.toTimeString().substring(0, 5); 

      setCheckOutDate(`${datePart}T${timePart}`); 
      return;
    }

    
    const eventEnd = new Date(event.end_at);

    
    const datePart = now.toISOString().split("T")[0]; 
    const nowTime = now.toTimeString().substring(0, 5); 
    const eventEndTime = eventEnd.toTimeString().substring(0, 5); 

    
    const finalTime = nowTime > eventEndTime ? eventEndTime : nowTime;

    setCheckOutDate(`${datePart}T${finalTime}`); 
  }, [event]);


  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
  
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16); 
    
    return formattedDate;
  };

  useEffect(() => {
    if(event)
    {
        form.setValue("event_id", event.id);  
        setEventExists(true);
        setEvent(event);
        console.log("presença: ",presences)
        const presence = presences.find((p) => p.event_id === event.id);
        console.log("presençaa achadaaa: ",presence)
        if (presence && presence.check_in_date) {
            const datePresence = formatDateForInput(presence.check_in_date)
            setCheckInDate(datePresence);
          } else {
            setCheckInDate("");
          }
    }
    
        
        
  }, [event]);


useEffect(() => {
    if (checkOutDate) {
      form.setValue("check_out_date", checkOutDate);
    }
}, [checkOutDate, form]);

useEffect(() => {
    if (checkInDate) {
      form.setValue("check_in_date", checkInDate);
      console.log("Check-in date set in form:", checkInDate);
    }
  }, [checkInDate, form]);


useEffect(() => {
    form.setValue("status", "registered");
  }, [form]);

  
 


  
  
  
  


    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckOut)}>
            <div className="grid grid-cols-3 p-4 space-x-4 max-md:space-x-0 max-md:flex max-md:flex-col max-md:space-y-4">
              <div className="p-4 flex flex-col space-y-3 border rounded-xl max-md:col-span-0">
                <div>
                  <span className="font-bold">Informações Dados</span>
                </div>
                <div>
                <FormField
  control={form.control}
  name="event_id"
  render={({ field }) => (
    <div>
      <label htmlFor="event_id" className="font-semibold text-sm text-gray-700">
        Selecione o Evento
      </label>
      <select
        {...field}
        id="event_id"
        className="w-full border rounded-md p-2"
        onChange={async (e) => {
          const eventId = e.target.value; 
          field.onChange(eventId); 
          await validateEventId(eventId);
        }}
      >
        <option value="">Selecione um evento...</option>


        {events.map((event) => (
  <option key={event.id} value={event.id}>
    {event.name}
  </option>
))}
      </select>

      
      {form.formState.errors.event_id?.message && (
        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.event_id?.message}
        </p>
      )}
      {eventExists === false && (
        <p className="text-red-500 text-sm mt-1">Evento não encontrado!</p>
      )}
    </div>
  )}
/>


                    {eventExists === false && (
  <p className="text-red-500 text-sm mt-1">Evento não encontrado!</p>
)}

                    </div>
                <div className='hidden'>
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItemField
                        field={{
                            ...field,
                            value: "registered", 
                        }}
                        label="Status da presença"
                        error={form.formState.errors.status?.message}
                        type="select" 
                        placeholder="registered"
                        />
                    )}
                    />
                </div>
              </div>
              <div className="p-4 border rounded-xl space-y-3">
                <div>
                  <span className="font-bold">Informações Data</span>
                </div>
                <div className='disabled'>
                <FormField
  control={form.control}
  name="check_out_date"
  render={({ field }) => (
    <FormItemField
      field={{
        ...field,
        value: checkOutDate, 
        onChange: (e) => {
          setCheckOutDate(e.target.value); 
          field.onChange(e.target.value); 
        },
      }}
      label="Data de saída limite"
      error={form.formState.errors.check_out_date?.message}
      type="datetime-local" 
      placeholder="Selecione data e hora de saída"
    />
  )}
/>


                </div>

                 <div className='disabled'>
                               <FormField
                                    control={form.control}
                                    name="check_in_date"
                                    render={({ field }) => (
                                        <FormItemField
                                        field={{
                                            ...field,
                                            value: field.value || checkInDate, 
                                            onChange: (e) => {
                                            setCheckInDate(e.target.value);
                                            field.onChange(e.target.value);
                                            },
                                        }}
                                        label="Data Check In"
                                        error={form.formState.errors.check_in_date?.message}
                                        type="datetime-local" 
                                        placeholder="Data Check In"
                                        />
                                    )}
                                    />
                
                
                                </div>
                

                
              </div>
              
            </div>
            <div>

           <button
        type="submit"
        className="mt-4 w-full bg-sky-800 text-white rounded-xl p-2 disabled:bg-gray-400"
        disabled={eventExists === false || loading} 
        >
        {loading ? "Verificando..." : "Confirmar Check-Out"}
        </button>


  
        </div>
              
            
          </form>
        </Form>
      </>
    );
  }
  