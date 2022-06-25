import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email
      }
    });

    navigate('/event');
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="min-h-[575px] bg-react-icon bg-no-repeat bg-top mt-4">
        <div className="w-full max-w-[1100px] flex items-center justify-between mt-16 mx-auto">
          <div className="max-w-[640px]">
            <Logo />

            <h1 className="mt-8 text-[2.5rem] leading-tight">
              Aprenda tudo sobre <strong className="text-red-600">vidraçaria e esquadrias</strong>, em alto nível com nossa <strong className="text-red-600">plataforma</strong>
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              Com o uso da nossa plataforma você irá aprender com conforto e liberdade a aplicar as páticas mais utilizadas e requisitadas no mercado de vidraçaria e esquadrias.
            </p>
          </div>

          <div className="p-8 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
              <input
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Seu nome completo"
                onChange={event => setName(event.target.value)}
              />

              <input
                className="bg-gray-900 rounded px-5 h-14"
                type="email"
                placeholder="Digite seu e-mail"
                onChange={event => setEmail(event.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-red-800 uppercase py-4 rounded font-bold text-sm hover:bg-red-900 transition-colors disabled:opacity-50"
              >
                Garantir minha vaga
              </button>
            </form>
          </div>
        </div>

        <div className="min-h-screen min-w-[1216px] bg-code-mockup bg-no-repeat bg-top"></div>
      </div>
    </div>
  );
}