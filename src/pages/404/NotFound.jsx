import Lottie from 'lottie-react';
import notFound from '../../assets/lottie/notFound.json';
import { useNavigate } from 'react-router-dom';
import { useLanguages } from '../../hooks/useLanguages';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useLanguages();
  return (
    <section className='flex flex-col justify-center items-center w-full h-screen'>
      <Lottie animationData={notFound} loop={true} className='w-xs sm:w-md' />

      <button
        onClick={() => navigate(-1)}
        className='px-6 py-3 bg-btn hover:bg-btn-hover rounded-lg transition'
      >
        {t('common.Go Back')}
      </button>
    </section>
  );
}
