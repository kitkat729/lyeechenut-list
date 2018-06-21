import moment from 'moment'

const Endpoints = {
  Endpoint1: {
      url: "https://gist.githubusercontent.com/stefsic/6cccb57ca589369692aa850328d901cd/raw/f11e8fba16079af7d1c9c4a5f9eb66d6626f1217/test_api.json",
      config: {
        transformResponse: function(data) {
          data = JSON.parse(data)

          if (!data.status) {
            return data
          }

          for (let item in data.data.list) {
            data.data.list[item].thumbnail = '//assets3.thrillist.com/v1/image/'+ data.data.list[item].image_id
          }

          return data.data
        }
      },
      sortMap: new Map([
            ['title', {
              comparer: function(a, b) {
                const itemA = a.title.toLowerCase()
                const itemB = b.title.toLowerCase()

                return (itemA < itemB) ? -1
                        :(itemA > itemB) ? 1
                        : 0
              },
              orderings: [
                {
                  type: 'ASC',
                  label: 'Ascending Title',
                },
                {
                  type: 'DESC',
                  label: 'Descending Title',
                }
              ],
            }],
            ['created', {
              comparer: function(a, b) {
                const itemA = moment.utc(a.created, "YYYY-MM-DDTHH:mm:ss").format('x')
                const itemB = moment.utc(b.created, "YYYY-MM-DDTHH:mm:ss").format('x')

                return itemA - itemB
              },
              orderings: [
                {
                  type: 'ASC',
                  label: 'Oldest',
                },
                {
                  type: 'DESC',
                  label: 'Latest',
                }
              ],
            }],
          ])
  }
}

export default Endpoints
