# TODO

## GUI

- [components] new number2 & number3 component
- [components] listen change ( implemented on componentNumber only at the moment )
- [components] implements step
- [components] implements isEditable
- [components] group created automatically for object ( partially done )

- [config] load multiple profile, ex: gui.load(['three','mnf','myproject'])
- [config] save/load on URL
- [config] support for websocket remote control

- [components/config] setting menu for individual object (to override the class setting on specific object)

- [ui] global setting button
- [ui] photoshop style ui : possibility of reducing the bar & have mini icon who open group
- [ui] create easy way to plug to the node graph ( see object lib maybe )
- [ui] create easy way to plug to the timeline ( see object lib maybe )

## Objects Library

```
objectlib.add(myobject)
objectlib.remove(myobject)
```

- [ui] display list of instancied objects
- [ui] possibility of showing object in gui
- [ui] possibility of adding the object to a timeline
- [ui] possibility of adding the object to a nodeGraph

## NodeGraph

- [new node] create a object node : node based on an object
- [test] create easy way to transform an object to a node
- [test] create easy way to link audio properties to other object value

- [new node] create a midicontroller node
- [test] create easy way to link midicontroller to other object value

- [new node] create a postprocessPass node / graph
- [test] modify easily the actual postprocess via graph

- [new node] create a shadermaterial node / graph
- [test] create easyly new shader via node graph

- [websocket] support for websocket remote control

## Timeline

- [test] test & improve the api
- [ui] dragndrop on keyframe to change their frame

## NanoGL

- [test] create basic mesh example
- [test] create basic particle example
- [test] create basic lines example
- [test] create basic instancied example
- [test] create basic postprocess effects pass

## UI Generic object

- [FunnyText] debug edge case
- [FacebookShare]
- [TwitterShare]
- [GoogleShare]
- [BurgerButton]
