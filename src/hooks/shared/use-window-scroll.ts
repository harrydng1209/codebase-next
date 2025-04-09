export const useWindowScroll = () => {
  const { addEventListener, removeEventListener, scrollX, scrollY } = window;

  const [scroll, setScroll] = useState({
    x: scrollX,
    y: scrollY,
  });

  const handleScroll = () => {
    setScroll({ x: scrollX, y: scrollY });
  };

  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, [scrollX, scrollY]);

  return scroll;
};
