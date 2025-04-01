import { Toaster } from 'sonner';
import HomePage from '~/page/HomePage';

function App() {
  return (
    <div className='px-3.5'>
      <HomePage />
      <Toaster position='bottom-right' richColors />
    </div>
  );
}

export default App;
