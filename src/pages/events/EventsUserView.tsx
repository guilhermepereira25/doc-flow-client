import PageHeader from '@/components/PageHeader';
import { components } from '@/lib/schema';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { getUserEvents } from '@/api/data/events.data';
import useAuth from '@/hooks/useAuth';
import ViewUserEventsBox from '@/components/events/ViewUserEventsBox';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import SearchBar from '@/components/SearchBar';

type Event = components['schemas']['Event'];

export default function EventsUserView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
  });
  const { user } = useAuth();
  const [eventsOnGoing, setEventsOnGoing] = useState<Event[]>([]);
  const [renderMessage, setRenderMessage] = useState(false);

  const fetchUsersEvents = useCallback(async () => {
    const userId = user?.sub;
    if (!userId) {
      return;
    }
    const data = await getUserEvents({
      id: userId,
      offset: 0,
      limit: 10,
    });
    if (!data) {
      setRenderMessage(true);
      return;
    }
    setEvents(data);
  }, [user]);

  const handleEventsOnGoing = useCallback(async () => {
    const eventsOnGoing = events.filter((event) => {
      return event.status === 'started';
    });
    setEventsOnGoing(eventsOnGoing);
  }, [events]);

  const handleEventSearch = async (search: string) => {
    if (!search) {
      return fetchUsersEvents();
    }
    const event = events.filter((event) => {
      return event.name.includes(search);
    });
    if (!event) {
      return;
    }
    setEvents(event);
  };

  const handlePagination = async (offset: number) => {
    const userId = user?.sub;
    if (!userId) {
      return;
    }
    const data = await getUserEvents({
      id: userId,
      offset: offset,
      limit: 10,
    });
    if (!data) return;
    setEvents(data);
    setPagination({ offset, limit: 10 });
  };

  useEffect(() => {
    fetchUsersEvents();
  }, [fetchUsersEvents]);

  useEffect(() => {
    handleEventsOnGoing();
  }, [events, handleEventsOnGoing]);

  return (
    <div>
      <PageHeader
        title="Meus eventos"
        description={`${eventsOnGoing.length} eventos em andamento`}
      />
      <div className="container max-w-full space-y-4 p-6">
        <SearchBar
          placeholder="Buscar eventos"
          onChange={(event) => handleEventSearch(event.target.value)}
        />
        <div className="flex flex-row">
          <Link to="/events/create">
            <Button className="bg-sky-900 text-white rounded-xl w-32">
              Criar evento
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Suspense fallback={<div>Carregando...</div>}>
            {events &&
              events.map((event) => {
                return <ViewUserEventsBox key={event.id} event={event} />;
              })}
            {events.length === 0 && renderMessage && (
              <div className="p-4 text-neutral-600">
                Você ainda não criou nenhum evento. Clique no botão acima para
                criar um evento.
              </div>
            )}
          </Suspense>
        </div>
        {events.length > 0 && (
          <div className="flex flex-row justify-end mt-4 space-x-4">
            <Button
              className="bg-sky-900 text-white rounded-xl w-32"
              disabled={pagination.offset === 0}
              onClick={() => handlePagination(pagination.offset - 1)}
            >
              Previous
            </Button>
            <Button
              className="bg-sky-900 text-white rounded-xl w-32"
              disabled={events.length < pagination.limit}
              onClick={() => handlePagination(pagination.offset + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
