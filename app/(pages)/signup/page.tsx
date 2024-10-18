"use client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Le nom d\'utilisateur est obligatoire')
    .min(3, "Le nom d'utilisateur doit contenir au moin 3 charactères")
    .max(30, "Le nom d'utilisateur doit contenir maximum 30 charactères"),
  email: Yup.string()
    .email('L\'email n\'est pas valide')
    .required('L\'email est obligatoire'),
  password: Yup.string()
    .required('Le mot de passe est obligatoire')
    .min(8, 'Le mot de passe doit contenir au moins 6 caractères'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre')
    .required('La confirmation du mot de passe est obligatoire')
});

const RegisterPage = () => {
  const [message, setMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    const res = await fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const responseData = await res.json();
      setMessage(responseData.message);
    } else {
      const errorData = await res.json();
      setMessage(`Erreur : ${errorData.error}`);
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-gray-800 shadow-lg rounded-lg py-12 px-16 w-2/5 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black w-full flex flex-col justify-center items-center py-8">
        
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          {...register('username')}
          className="w-4/5 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="w-4/5 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input
          type="password"
          placeholder="Mot de passe"
          {...register('password')}
          className="w-4/5 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        
        <input
          type="password"
          placeholder="Répétez le mot de passe"
          {...register('passwordRepeat')}
          className="w-4/5 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.passwordRepeat && <p className="text-red-500">{errors.passwordRepeat.message}</p>}

        <button
          type="submit"
          className="w-4/5 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Ajouter Utilisateur
        </button>
      </form>
      
      {message && (
        <p className="mt-4 text-center text-red-500">{message}</p>
      )}
    </div>
  );
};

export default RegisterPage;
