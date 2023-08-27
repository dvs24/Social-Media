export const authReducer = (state = { authdata: {}, loading: false, error: false }, action) => {
  switch (action.type) {
    // for Auth
    
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      try {
        const serializedData = JSON.stringify(action.data);
        localStorage.setItem('profile', serializedData);
      } catch (error) {
        console.error("Error serializing data:", error);
      }
      return { ...state, authdata: action.data, loading: false, error: false }; 

    case "AUTH_FAIL":
      return { ...state, error: true, loading: false };

      //For Update

    case "UPDATING_START":
      return{...state, updateLoading : true, error: false}

    case "UPDATING_SUCCESS":
      localStorage.setItem('profile', JSON.stringify(action.data))
      return{...state, authdata : action.data, updateLoading:false, error:false}
    
    case "UPDATING_FAIL":
      return{...state, updateLoading:false, error: true} 
      
    case "FOLLOW_USER":
      return{...state,authdata :{...state.authdata, user : {...state.authdata.user, following : [...state.authdata.user.following, action.data]}}}

    case "UNFOLLOW_USER":
      return{...state, authdata:{...state.authdata, user: {...state.authdata.user, following: [...state.authdata.user.following.filter((personId)=>personId!==action.data)]}}}
      //For LOg Out

    case "LOG_OUT":
      localStorage.clear()
      return{...state, authdata: {}, error: false, loading: false}
    default:
      return state;
    } 
}

  