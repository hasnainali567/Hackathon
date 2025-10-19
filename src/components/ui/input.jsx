import React from 'react'

const Input = ({ label, id, name, placeholder, type }) => {
    return (
        <div>
            <label className="sr-only" htmlFor="email">{label}</label>
            <input className="w-full px-4 py-3 rounded-lg bg-background-light/70 dark:bg-background-dark/70 border border-slate-300/50 dark:border-slate-700/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white" id={id} name={name} placeholder={placeholder} type={type} />
        </div>
    )
}

export default Input