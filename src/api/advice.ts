import axios from 'axios';

interface ApiResponse { }

interface Advice {
    advice: string
    slip_id: string
}
interface Slip extends ApiResponse {
    slip: Advice
}
interface Slips extends ApiResponse {
    slips: Advice[]
}

const demo: Advice = { advice: 'test advice', slip_id: '3' };

const ADVICE_API_RANDOM = 'https://api.adviceslip.com/advice';
const ADVICE_API_BY_ID =
    (id: number) => `https://api.adviceslip.com/advice/${id}`;
const ADVICE_API_QUERY =
    (query: string) => `https://api.adviceslip.com/advice/search/${query}`;

async function getRandom(): Promise<Advice[]> {
    const response = await axios.get<Slip>(ADVICE_API_RANDOM);
    if (response.data) {
        return Array(<Advice>response.data.slip);
    } else {
        throw new Error(`Failed to seek Advice because ${JSON.stringify(response.data)}.`);
    }
}

async function getIds(ids: number[]): Promise<Advice[]> {
    return Array(demo);
}

async function getQuery(query: string): Promise<Advice[]> {
    const response = await axios.get<Slips>(ADVICE_API_QUERY(query));
    if (response.data.slips) {
        return response.data.slips;
    } else {
        throw new Error(`Failed to search for Advice ${query} because ${JSON.stringify(response.data)}.`);
    }
}

export { Advice, getRandom, getIds, getQuery, Slip };