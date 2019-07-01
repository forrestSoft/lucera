import React from 'react'

const metaStateContext = React.createContext()
const metaDispatchContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function MetaProvider({children}) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  return (
    <MetaStateContext.Provider value={state}>
      <MetaDispatchContext.Provider value={dispatch}>
        {children}
      </MetaDispatchContext.Provider>
    </MetaStateContext.Provider>
  )
}

function useMetaState() {
  const context = React.useContext(MetaStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export {CountProvider, useCountState, useCountDispatch}
