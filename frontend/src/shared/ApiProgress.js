import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'

export const useApiProgress = (apiMethod, apiPath, strictPath = false) => {
    const [pendingApiCall, setPendingAPiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor,responseInterceptor = undefined;
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use((request) => {

                if(strictPath && apiPath === request.url && request.method === apiMethod){
                    setPendingAPiCall(true);
                }
                else if(!strictPath && request.url.startsWith(apiPath) && request.method === apiMethod){
                    setPendingAPiCall(true);
                }
                return request;
            })
    
            responseInterceptor = axios.interceptors.response.use((response) => {
                if(response.config.url.startsWith(apiPath) && response.config.method === apiMethod){
                    setPendingAPiCall(false);

                }
                return response;
            }, (error) => {
    
                if(error.config.url.startsWith(apiPath)){
                    setPendingAPiCall(false);

                }
                throw error;
            })
        }

        registerInterceptors();

        
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
            
        }

        return function unmount() {
            unregisterInterceptors();
        }
    },[apiPath, apiMethod])

    return pendingApiCall;
}

export function withApiProgress(WrappedComponent,apiMethod,apiPath){
    return class extends Component {
  
        state = {
            pendingApiCall: false
        }
      
        registerInterceptors = () => {
            this.requestInterceptor = axios.interceptors.request.use((request) => {
                if(request.url.startsWith(apiPath) && request.method === apiMethod){
                    this.setState({
                        pendingApiCall: true
                    })
                }
                return request;
            })
    
            this.responseInterceptor = axios.interceptors.response.use((response) => {
                if(response.config.url.startsWith(apiPath) && response.config.method === apiMethod){
                    this.setState({
                        pendingApiCall: false
                    })
                }
                return response;
            }, (error) => {
    
                if(error.config.url.startsWith(apiPath)){
                    this.setState({
                        pendingApiCall: false
                    })
                }
                throw error;
            })
        }

        unregisterInterceptors = () => {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
            
        }

        componentDidMount(){
            this.registerInterceptors();
        }
    
        componentWillUnmount(){
            this.unregisterInterceptors();
        }

        render() {
        //return <div>{React.cloneElement(this.props.children, {pendingApiCall: this.state.pendingApiCall})}</div>
        return <WrappedComponent pendingApiCall={this.state.pendingApiCall} {...this.props} />
    }
    } 
}
