import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { atomWithHash, RESET } from 'jotai/utils'

type ValidateFunc = (value: string) => string | true

interface IOptions {
  default?: string
  required?: boolean
  validate?: ValidateFunc
}

interface ISettings {
  required: boolean
  validate: ValidateFunc | undefined
}

interface IStateOptions {
  [key: string]: ISettings
}

interface IState {
  [key: string]: string
}

interface IErrorState {
  [key: string]: undefined | string
}

interface ITouchedState {
  [key: string]: boolean
}

const generateErrorState = (defaultState: IState): IErrorState => {
  const errorState: IErrorState = {}
  for (const key in defaultState) {
    errorState[key] = undefined
  }
  return errorState
}

const generateTouchedState = (defaultState: IState): ITouchedState => {
  const touchedState: ITouchedState = {}
  for (const key in defaultState) {
    touchedState[key] = false
  }
  return touchedState
}

const checkValid = (errors: IErrorState) => {
  return Object.values(errors).every(error => error === undefined)
}


const useForm = (urlKey: string) => {
  const defaultState: IState = {}
  const stateOptions: IStateOptions = {}
  const stateAtom = useMemo(() => atomWithHash<IState>(urlKey, defaultState, {replaceState: true}), []);
  const [state, setState] = useAtom(stateAtom)

  const [errors, setErrors] = useState<IErrorState>(generateErrorState(defaultState))
  const [touched, setTouched] = useState<ITouchedState>(generateTouchedState(defaultState))

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // update touched state to reflect user interaction
    setTouched({
      ...touched,
      [e.target.name]: true,
    })
    // update state to reflect user input
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const validate = (data: IState, checkTouched: boolean = true): IErrorState => {
    const newErrors: IErrorState = {}
    for (const key in data) {
      // cancel check if the field was not touched
      if (checkTouched && !touched[key]) continue

      // check if field is required
      if (stateOptions[key].required && data[key] === '') {
        newErrors[key] = 'Field is required'
        continue
      }

      const checkFunc = stateOptions[key].validate
      if (checkFunc !== undefined) {
        const res: string | true = checkFunc(data[key])
        newErrors[key] = res === true ? undefined : res
      }
    }
    return newErrors
  }

  useEffect(() => {
    setErrors(validate(state))
  }, [state])

  const register = (name: string, options: IOptions = {}) => {
    defaultState[name] = options.default || ''
    stateOptions[name] = {
      required: options.required || true,
      validate: options.validate,
    }

    return {
      name,
      value: state[name],
      onChange: handleChange,
      error: Boolean(errors[name]),
      helperText: errors[name] || '',
    }
  }

  const reset = () => {
    setState(defaultState)
    setErrors(generateErrorState(defaultState))
    setTouched(generateTouchedState(defaultState))
  }

  const forceValidate = (): boolean => {
    const res = validate(state, false)
    setErrors(res)
    return checkValid(res)
  }

  const clear = () => {
    reset()
    setState(RESET)
  }

  return {
    state,
    errors,
    register,
    reset,
    forceValidate,
    clear,
  }
}

export default useForm
