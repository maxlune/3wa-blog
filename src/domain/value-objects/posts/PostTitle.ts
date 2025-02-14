export class PostTitle {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error("Le titre est requis");
    }

    if (value.length < 3) {
      throw new Error("Le titre doit faire au moins 3 caractères");
    }
  }

  get title(): string {
    return this.value;
  }
}