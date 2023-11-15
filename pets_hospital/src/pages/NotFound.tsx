/*
 * @Author: VirginLuna
 * @Date: 2023-11-16 14:19:07
 * @Description:
 */
export default function NotFound() {
  const origin = window.location.origin;
  const url = new URL(origin).origin;
  return (
    <iframe
      title='title'
      src={`${url}/errorPage/404.html`}
      frameBorder='0'
      height='100%'
      width='100%'
      scrolling='no'
    ></iframe>
  );
}
