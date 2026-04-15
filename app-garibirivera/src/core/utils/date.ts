/**
 * Obtiene un saludo amigable basado en la hora actual del sistema.
 * @returns {string} "Buenos días", "Buenas tardes" o "Buenas noches".
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}
