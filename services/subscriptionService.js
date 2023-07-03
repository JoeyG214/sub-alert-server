subscriptionsRouter.get('/', async (request, response) => {
  const subscriptions = await Subscription.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(subscriptions)
})

subscriptionsRouter.get('/:id', async (request, response) => {
  const subscription = await Subscription.findById(request.params.id)
  if (subscription) {
    response.json(subscription)
  } else {
    response.status(404).end()
  }
})

subscriptionsRouter.post('/', async (request, response) => {
  

  const subscription = new Subscription(request.body)

  const savedSubscription = await subscription.save()
  response.json(savedSubscription)
}
)

subscriptionsRouter.delete('/:id', async (request, response) => {
  