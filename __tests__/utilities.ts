const envVars: string[] = [];

export function setInput(name: string, value: string): void {
	const envName = `INPUT_${name.replace(' ', '').toUpperCase()}`;

	process.env[envName] = value;
	envVars.push(envName);
}

export function clearInputs(): void {
	for (const envVar of envVars) {
		delete process.env[envVar];
	}
}
