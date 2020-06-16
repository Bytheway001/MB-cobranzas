import Axios from "axios";

export const Companies = [
    {
        id: 1,
        name: 'BEST DOCTORS',
        slug: 'bestdoctors',
        plans: [
            {
                id: 1,
                name: 'Premier Plus'
            },
            {
                id: 2,
                name: 'Global Care'
            },
            {
                id: 3,
                name: 'Medical Care Latam',
            },
            {
                id: 4,
                name: 'Medical Care Global'
            },
            {
                id: 5,
                name: 'Medical Elite'
            },
            {
                id: 6,
                name: 'Advance Care'
            },
            {
                id: 7,
                name: 'Ultimate Care'
            },
            {
                id: 8,
                name: 'Prime Care'
            },
            {
                id: 9,
                name: 'Medical Select'
            }
        ]
    },
    {
        id: 2,
        name: 'ALLIANZ',
        slug: 'allianz',
        plans: [
            {
                id: 10,
                name: 'Global Pass Choice I Mundial'
            },
            {
                id:11,
                name:'Global Pass Choice II Mundial'
            },
            {
                id:12,
                name:'Global Pass Connect Mundial'
            },
            {
                id:13,
                name:'Global Pass Choice I Latam'
            },
            {
                id:14,
                name:"Global Pass Choice II Latam"
            },
            {
                id:15,
                name:"Global Pass Connect Latam"
            }
        ]
    },
    {
        id:3,
        name:'VUMI',
        slug:'vumi',
        plans:[
            {
                id:16,
                name:'Special VIP'
            },
            {
                id:17,
                name:'Universal VIP'
            },
            {
                id:18,
                name:'Access VIP'
            },
            {
                id:19,
                name:'Optimum VIP'
            },
            {
                id:20,
                name:'Senior VIP'
            }
        ]
    },
    {
        id:4,
        name:'BUPA BOLIVIA',
        slug:'bupa',
        plans:[
            {
                id:21,
                name:'Critical Care'
            },
            {
                id:22,
                name:'Global Select'
            },
            {
                id:23,
                name:'Global Premier'
            },
            {
                id:24,
                name:'Global Ultimate'
            },
            {
                id:25,
                name:'Flex 1'
            },
            {
                id:26,
                name:'Flex 2'
            },
            {
                id:27,
                name:'Diamond Care'
            },
            {
                id:28,
                name:'Complete Care'
            },
            {
                id:29,
                name:'Advantage Care'
            },
            {
                id:30,
                name:'Secure Care'
            },
            {
                id:31,
                name:'Essential Care'
            },
            {
                id:32,
                name:'Global Major Medical'
            }
        ]
    },
    {
        id:5,
        name:'BMI Insurance',
        slug:'bmi',
        plans:[
            {
                id:33,
                name:'Ideal 500'
            },
            {
                id:34,
                name:'Meridian II Guarantee'
            },
            {
                id:35,
                name:'Azure Guarantee'
            }
        ]
    },{
        id:6,
        name:'American Fidelity',
        plans:[],
        slug:'American Fidelity'
    },
    {
        id:7,
        name:'Morgan & White',
        slug:'morgan',
        plans:[]
    },
    {
        id:8,
        name:'Hiscox',
        slug:'hiscox',
        plans:[]
    },
    {
        id:9,
        name:'Old Mutual',
        slug:'oldmutual',
        plans:[],
    },
    {
        id:10,
        name:'Bupa Off',
        slug:'bupaoff',
        plans:[]
    },
    {
        id:11,
        name:'Panamerican Life',
        slug:'panam',
        plans:[
            {id:36,name:'Next GenUL Universal'},
            {id:37,name:"Termino 95"},
            {id:38,name:'Termino 100'},
            {id:39,name:"Indexed"}
        ]
    }
   
]


export function formatMoney(amount,decimalCount = 2,decimal = ".",thousands = ",",currency='$') {
    try {

        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            currency +
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : "")
        );
    } catch (e) {}
}

export const setupInterceptors = (u)=>{
    Axios.interceptors.request.use(config=>{
        config.headers.u = u;
        return config
    })
}

export const roles = {
    
}

export const UserIs = (user,level)=>{
    let roles = {staff:128,collector:224,admin:248,master:255}
    let userRole = roles[user.role]
    return userRole >= level
}