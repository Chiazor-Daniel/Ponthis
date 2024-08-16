import React from 'react';
import MyLayout from '../components/layout-other';

const Accounts = () => {
  const accountPlans = [
    {
      name: 'Basic',
      description: 'Perfect to get started',
      price: 250,
      buttonText: '7 days free trial',
    },
    {
      name: 'Standard',
      description: 'Great for small businesses',
      price: 500,
      buttonText: 'Start now',
    },
    {
      name: 'Premium',
      description: 'For growing businesses',
      price: 750,
      buttonText: 'Start now',
    },
    {
      name: 'Advanced',
      description: 'Ideal for large enterprises',
      price: 1000,
      buttonText: 'Start now',
    },
  ];

  return (
    <MyLayout title={'Accounts'}>
      <section className='min-h-[600px] bg-gray-900  flex flex-col items-center p-[100px]'>
        <h1 className='text-white text-4xl font-bold capitalize'>Awesome Account Plans for Your Business</h1>
        <div className='p-8 flex flex-wrap justify-center gap-8'>
          {accountPlans.map((plan, index) => (
            <div key={index} className='min-h-[250px] w-[300px] flex flex-col justify-around p-4 bg-gray-700 rounded-md gap-2 shadow-md shadow-orange-400 mb-8'>
              <div>
                <p className='text-white font-bold text-2xl'>{plan.name}</p>
                <p className='text-gray-100'>{plan.description}</p>
              </div>
                <p className='text-white text-6xl font-bold'>
                  <span className="text-orange-500">$</span>{plan.price}
                  {typeof plan.price === 'number' && <span className='text-sm'> balance</span>}
                </p>
              <button className='border-none py-2 px-6 bg-orange-500 text-white font-normal text-xl rounded-md'>
                {plan.name === 'Basic' ? plan.buttonText : 'Start now'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </MyLayout>
  );
}

export default Accounts;
