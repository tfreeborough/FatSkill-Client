import api_config from '../../../../../../config/api.config';
import { browserHistory } from 'react-router';

export const setNextAuthRoute = (nextRoute) => ({ type:'SET_NEXT_AUTH_ROUTE', route:nextRoute });
export const setCurrentGeneratedTest = (test) => ({ type:'SET_CURRENT_GENERATED_TEST', test });
export const clearCurrentGeneratedTest = () => ({ type:'CLEAR_CURRENT_GENERATED_TEST' });

export const sendCreationRequest = (formData) => {
  return dispatch => {
    
    dispatch(setCurrentGeneratedTest(formData));
    
   if(typeof localStorage !== 'undefined') {
    let token = JSON.parse(localStorage.getItem('fs_api_t'));
    fetch(api_config.host + '/api/tests/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': (token !== null ? token.value : '')
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        let json = res.json();
        if (res.status >= 200 && res.status < 300) {
          return {body: json, token: res.headers.get('Authorization')};
        } else if(res.status === 401) {
          dispatch(setNextAuthRoute(window.location.pathname));
          browserHistory.push('/login');
          return json.then(Promise.reject.bind(Promise));
        }else{
          return json.then(Promise.reject.bind(Promise));
        }
      })
      .then(({body, token}) => {

        body.then(json => {
          browserHistory.push("/dashboard/tests/view/"+json.uuid);
        });

      })
      .catch(err => {
          console.log(err.message);
      });
    }
  }
};

