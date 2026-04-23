window.BENCHMARK_DATA = {
  "lastUpdate": 1776910991324,
  "repoUrl": "https://github.com/maxence2997/carousel",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "jyunanyang@gmail.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "committer": {
            "email": "jyunanyang@gmail.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "distinct": true,
          "id": "5fd34f478d551f351c4438070dc345684c93c0ac",
          "message": "ci: use /benchmarks path for benchmark history page",
          "timestamp": "2026-04-23T10:22:19+08:00",
          "tree_id": "4b184fa8ed947cdd4e5411a688e11e34d1f59991",
          "url": "https://github.com/maxence2997/carousel/commit/5fd34f478d551f351c4438070dc345684c93c0ac"
        },
        "date": 1776910990466,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.01,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.01,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush",
            "value": 3.646,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "987285864 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 3.646,
            "unit": "ns/op",
            "extra": "987285864 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "987285864 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "987285864 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.099,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.099,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain",
            "value": 2422,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1474568 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2422,
            "unit": "ns/op",
            "extra": "1474568 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1474568 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1474568 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 12.04,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "300762471 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 12.04,
            "unit": "ns/op",
            "extra": "300762471 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "300762471 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "300762471 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 21.44,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "165280940 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 21.44,
            "unit": "ns/op",
            "extra": "165280940 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "165280940 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "165280940 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 31.94,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "98660829 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 31.94,
            "unit": "ns/op",
            "extra": "98660829 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "98660829 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "98660829 times\n4 procs"
          }
        ]
      }
    ]
  }
}