import axios from "axios";

const useAuth = (baseUrl = "https://lit-savannah-98479.herokuapp.com") => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = baseUrl ? baseUrl : undefined;

  // axios.interceptors.response.use(undefined, (err) => {
  //   const error = err.response;
  //   // if error is 401
  //   if (error.status === 401) {
  //     throw new Error("Unauthenticated");
  //   }
  // });
  return {
    get: async function (url) {
      try {
        return await axios.get(url);
      } catch (err) {
        return err.response;
      }
    },
    post: async function (url, data) {
      try {
        return await axios.post(url, data ? data : null);
      } catch (err) {
        return err.response;
      }
    },
    delete: async function (url) {
      try {
        return await axios.delete(url);
      } catch (err) {
        return err.response;
      }
    },
    put: async function (url, data) {
      try {
        return await axios.put(url, data ? data : null);
      } catch (err) {
        return err.response;
      }
    },
    patch: async function (url, data) {
      try {
        return await axios.patch(url, data ? data : null);
      } catch (err) {
        return err.response;
      }
    },

    login: async function (loginUrl, data) {
      const con = {
        baseURL: baseUrl ? baseUrl : undefined,
      };
      try {
        const response = await axios.post(loginUrl, data ? data : null, con);

        return {
          success: true,
          error: null,
          cookie: response.headers.cookie,
          user: response.data.data,
        };
      } catch (err) {
        return { success: false, error: err.message, token: null };
      }
    },

    logout: function () {
      // hit the endpoint to logout.
    },
  };
};

export default useAuth;
