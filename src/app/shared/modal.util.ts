export function openInModal<T>(component: T): Promise<any> {
  const host = document.getElementById('app-modal') as HTMLDialogElement;
  host.innerHTML = ''; host.appendChild(component as any);
  host.showModal();
  return new Promise(res => {
    host.addEventListener('close', () => res((host as any).returnValue), { once: true });
  });
}
