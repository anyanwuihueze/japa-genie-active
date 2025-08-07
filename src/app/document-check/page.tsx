import DocumentCheckClient from './client';

export default function DocumentCheckPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">AI Document Checker</h1>
        <p className="text-lg text-muted-foreground">
          Upload your documents to let our AI find missing or incorrect information.
        </p>
      </header>
      <DocumentCheckClient />
    </div>
  );
}
