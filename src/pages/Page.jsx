import { useRef } from 'react';

export const Counter = () => {
  let ref = useRef(0);

  const handleClick = () =>  {
    ref.current = ref.current + 1;
    alert('¡Hiciste clic ' + ref.current + ' veces!');
  }

  return (
    <button onClick={handleClick}>
      ¡Hazme clic!
    </button>
  );
}