import * as React from 'react' 

const MOBILE_BREAKPOINT = 768
export  function useIsMobile () {
    const [isMobile,steIsMobile] = React.useState<boolean | undefined>(undefined)
    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)')
        const onChance = () => {
        setIsMobile(window,innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener( 'chance' , onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener( 'chance' , onChange)
           
    },[])
    
     return !! isMobile
     }
    
}

    