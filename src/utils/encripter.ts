import bcrypt from "bcrypt";

export default class Encrypter {
	static #ENCRYPT_PEPPER: string;
	static init() {
		this.#ENCRYPT_PEPPER = process.env.ENCRYPT_PEPPER;
	}
	static #withPepper(plainText: string) {
		return `${plainText}${Encrypter.#ENCRYPT_PEPPER}`;
	}
	static async encrypt(plainText: string) {
		return await bcrypt.hash(Encrypter.#withPepper(plainText), 12);
	}
	static async compare(plainText: string, hashedText: string) {
		return await bcrypt.compare(
			Encrypter.#withPepper(plainText),
			hashedText
		);
	}
}
