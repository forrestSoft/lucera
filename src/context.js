import React, {createContext} from 'react'

const DispatchContext = createContext({LOADING: true})
export default DispatchContext

const MetaContext = createContext({LOADING: true})
export {MetaContext}