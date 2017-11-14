/**
 * Created by jacob on 09-07-17.
 */
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.credentials = 'same-origin';

class commonRestApi {
  constructor(module) {
    this.list_action = '/api/' + module + '/';
    // let csrftoken = $('#container').data('csrftoken');
    // axios.defaults.headers.common['X-CSRFTOKEN'] = csrftoken;
  }


  getAll(params) {
    let fetchUrl = this.list_action;
    if (params) {
      let {query, url} = params;

      if (query) {
        fetchUrl += query;
      }
      if (url) {
        fetchUrl = url;
      }
    }
    return axios.get(fetchUrl)
      .then(response => {
        response.data.last_url = fetchUrl;
        return response.data;
      });

  }


  save(data) {
    return axios.put(data.url, data)
      .then(response => {
        return response.data;
      });
  }

  insert(data) {
    return axios.post(this.list_action, data)
      .then(response => {
        return response.data;
      });
  }

  delete(data) {
    return axios.delete(data.url, data)
      .then(response => {
        return (response.status >= 200 && response.status < 300) || response.status === 404;
      })
      .catch(error => {
        let response = error.response;
        if (response.status === 500) {
          let new_error = new Error(response.data);
          throw new_error;
        } else if (response === 404) {
          return true;
        }
        return response;
      });

  }

  postUrl(url, data) {
    return axios.post(url, data)
      .then(response => {
        return response.data;
      });

  }

  getUrl(url) {
    return axios.get(url)
      .then(response => {
        return response.data;
      });
  }


  getApiUrl(url) {
    return axios.get(this.list_action + url + '/')
      .then(response => {
        return response.data;
      });
  }

}


export default commonRestApi;
