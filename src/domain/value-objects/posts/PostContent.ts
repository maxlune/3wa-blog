export class PostContent {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error("Le contenu de l'article est requis");
    }
  }

  get content(): string {
    return this.value;
  }
}