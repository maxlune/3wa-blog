export default class Password {

    constructor(public value: string) {
        if (!this.isValid(value)) {
            throw new Error(`Invalid password: ${value}.`);
        }
    }

    private isValid(value: string): boolean {
        const lengthRule = value.length >= 8;
        const uppercaseRule = /[A-Z]/.test(value);    // 1 maj
        const lowercaseRule = /[a-z]/.test(value);    // 1 min
        const numberRule = /[0-9]/.test(value);       // 1 chiffre
        const specialCharRule = /[!@#$%^&*(),.?":{}|<>]/.test(value); // 1 char spe

        return lengthRule && uppercaseRule && lowercaseRule && numberRule && specialCharRule;
    }

    public toString(): string {
        return this.value;
    }
}