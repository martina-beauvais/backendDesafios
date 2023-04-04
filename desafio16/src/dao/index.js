let key = 1;
let persistencia;

switch (key) {
    case 1 :
        persistencia = 'mongoDB'
        break;
    case 2 :
        persistencia = 'filesystem'
        break;
    default:
        persistencia = 'mongoDB'
        break;
}