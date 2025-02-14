export default class Email {
    constructor(public value: string) {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(value);
        if(isValid) {
            // this.value = value;
        } else {
            throw new Error(`Invalid email: ${value}.`);
        }

    }

    public toString(): string {
        return this.value;
    }
}