import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { useMessages } from "@/hooks/useMessages";
import { formatDate } from "@/lib/format";

export function MessageList() {
  const { messages, toggleAnswered } = useMessages();

  if (messages.isPending) {
    return (
      <div className="grid gap-3" role="status" aria-label="Carregando mensagens">
        {[0, 1, 2].map((item) => (
          <Card key={item}>
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </Card>
        ))}
      </div>
    );
  }

  if (messages.isError) {
    return (
      <StatusMessage
        title="Não consegui carregar as mensagens"
        action={
          <Button variant="outline" size="sm" onClick={() => messages.refetch()}>
            Tentar de novo
          </Button>
        }
      >
        Confira a conexão e tente mais uma vez.
      </StatusMessage>
    );
  }

  if (messages.data.length === 0) {
    return (
      <StatusMessage title="Nenhuma mensagem ainda">
        Quando alguém escrever pelo site, a mensagem aparece aqui.
      </StatusMessage>
    );
  }

  return (
    <ul className="grid gap-3">
      {toggleAnswered.isError && (
        <li role="status" className="font-bold text-danger">
          Não consegui atualizar a mensagem. Tente de novo.
        </li>
      )}
      {messages.data.map((message) => {
        const pending = toggleAnswered.isPending && toggleAnswered.variables?.id === message.id;

        return (
          <li key={message.id}>
            <Card className={message.answered ? "opacity-70" : undefined}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-extrabold">{message.name}</h3>
                <span className="text-sm text-mute">{formatDate(message.created_at)}</span>
              </div>
              <a href={`mailto:${message.email}`} className="text-sm font-bold">
                {message.email}
              </a>
              <p className="mt-2 whitespace-pre-wrap">{message.message}</p>
              <div className="mt-3 flex items-center gap-3">
                <Button
                  variant={message.answered ? "outline" : "primary"}
                  size="sm"
                  disabled={pending}
                  onClick={() =>
                    toggleAnswered.mutate({ id: message.id, answered: !message.answered })
                  }
                >
                  {pending && <Spinner />}
                  {message.answered ? "Marcar como não respondida" : "Marcar como respondida"}
                </Button>
                {message.answered && (
                  <span className="text-sm font-bold text-gold-ink">Respondida</span>
                )}
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
