import React from 'react'

const Loader = () => {
  return (
    <div className="bg-bg-primary dark:bg-dark-bg-primary font-display">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary dark:bg-dark-bg-primary">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent animate-spin "></div>
        </div>
      </div>
    </div>
  )
}

export default Loader;