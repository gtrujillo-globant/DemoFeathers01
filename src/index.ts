import feathers from '@feathersjs/feathers';

const app = feathers();

app.use('todos', {
  async get(name: string) {
    return {
      name,
      text: `You have to do ${name}`
    };
  }
});

async function getTodo(name: string) {
  const service = app.service('todos');
  const todo = await service.get(name);

  console.log(todo);
}

getTodo('dishes');