export default defineEventHandler((event) => {
    return {
        ID: 'TESTING',
        aux_minutes: '',
        aux_seconds: '',
        ball_on: '',
        brightness: 'high',
        down: randomInteger(1,4),
        guest_score: randomInteger(1,99),
        guest_tol: randomInteger(1,3),
        home_score: randomInteger(1,99),
        home_tol: randomInteger(1,3),
        horn: '1',
        minutes: randomInteger(1,20),
        period: randomInteger(1,4),
        possession: Number(randomInteger(0,1)) == 0 ? 'home' : 'guest',
        seconds: randomInteger(1,59),
        tenths: randomInteger(1,10),
        time_direction: '',
        time_flag: '',
        yards_to_go: randomInteger(1,10),
    }
})

function randomInteger(min, max) {
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
  