package carousel_test

import (
	"context"
	"fmt"

	"github.com/maxence2997/carousel"
)

func ExampleRingBuffer() {
	buf := carousel.NewRingBuffer[int](3)

	buf.Push(1)
	buf.Push(2)
	buf.Push(3)
	buf.ForcePush(4)

	value, _ := buf.Pop()
	fmt.Println(value)
	fmt.Println(buf.Drain())

	// Output:
	// 2
	// [3 4]
}

func ExampleRingQueue() {
	q := carousel.NewRingQueue[string](3)
	defer q.Close()

	_ = q.Enqueue("alpha")
	_ = q.Enqueue("beta")

	item, _ := q.Pop(context.Background())
	fmt.Println(item)
	fmt.Println(q.Drain())

	// Output:
	// alpha
	// [beta]
}
