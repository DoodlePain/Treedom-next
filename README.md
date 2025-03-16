# Treedom Multi-Step Form

Questo è un progetto [Next.js](https://nextjs.org) avviato con [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Introduzione

Questo progetto è un esempio di modulo multi-step utilizzando Next.js e React. In modalità desktop, il modulo è strutturato verticalmente su una sola pagina. In modalità mobile, il modulo è diviso in step utilizzando Embla Carousel.

## Avvio del Progetto

Per avviare il server di sviluppo:

```bash
npm run dev
# oppure
yarn dev
# oppure
pnpm dev
# oppure
bun dev
```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser per vedere il risultato.

Puoi iniziare a modificare la pagina modificando `pages/index.tsx`. La pagina si aggiorna automaticamente mentre modifichi il file.

Le [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) possono essere accessibili su [http://localhost:3000/api/hello](http://localhost:3000/api/hello). Questo endpoint può essere modificato in `pages/api/hello.ts`.

La directory `pages/api` è mappata su `/api/*`. I file in questa directory sono trattati come [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) invece che come pagine React.

Questo progetto utilizza [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) per ottimizzare e caricare automaticamente [Geist](https://vercel.com/font), una nuova famiglia di font per Vercel.

## Struttura del Progetto

- `pages/`: Contiene le pagine del progetto.
  - `index.tsx`: La pagina principale che include il modulo multi-step.
  - `api/`: Contiene le API routes.
  - `components/`: Contiene i componenti utilizzati nel progetto.
    - `FormContainer.tsx`: Il contenitore del modulo multi-step.
    - `FormField.tsx`: Un componente per i campi del modulo.
    - `MultiStepForm.tsx`: Il componente principale del modulo multi-step.
    - `DotButtons.tsx`: I pulsanti per navigare tra gli step del modulo in modalità mobile.
    - `ErrorMessage.tsx`: Un componente per visualizzare i messaggi di errore.

## Ulteriori Informazioni

Per saperne di più su Next.js, dai un'occhiata alle seguenti risorse:

- [Documentazione di Next.js](https://nextjs.org/docs) - scopri le funzionalità e le API di Next.js.
- [Impara Next.js](https://nextjs.org/learn-pages-router) - un tutorial interattivo su Next.js.

Puoi controllare il [repository GitHub di Next.js](https://github.com/vercel/next.js) - i tuoi feedback e contributi sono benvenuti!

## Deploy su Vercel

Il modo più semplice per effettuare il deploy della tua app Next.js è utilizzare la [piattaforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dai creatori di Next.js.

Consulta la nostra [documentazione sul deploy di Next.js](https://nextjs.org/docs/pages/building-your-application/deploying) per maggiori dettagli.
