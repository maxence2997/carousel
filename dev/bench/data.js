window.BENCHMARK_DATA = {
  "lastUpdate": 1776910798575,
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
          "id": "0b7393f5240a5f38a09b3231494c20c20fb7871b",
          "message": "doc: replace bench badges with static table; repurpose workflow as regression guard\n\n1.README — remove shields.io endpoint badges; add benchmark table with M1 Max numbers and link to CI history\n2.benchmark workflow — drop badge JSON generation; use benchmark-action to store history and alert on >50% regression",
          "timestamp": "2026-04-23T10:15:29+08:00",
          "tree_id": "486a6f067db017d98cffd62b19fbb16da1da8c49",
          "url": "https://github.com/maxence2997/carousel/commit/0b7393f5240a5f38a09b3231494c20c20fb7871b"
        },
        "date": 1776910577465,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.171,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.171,
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
            "value": 4.297,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "836056088 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.297,
            "unit": "ns/op",
            "extra": "836056088 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "836056088 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "836056088 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.239,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.239,
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
            "value": 2370,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1493769 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2370,
            "unit": "ns/op",
            "extra": "1493769 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1493769 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1493769 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 10.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "318816903 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 10.97,
            "unit": "ns/op",
            "extra": "318816903 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "318816903 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "318816903 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 23.36,
            "unit": "ns/op\t       1 B/op\t       0 allocs/op",
            "extra": "154503553 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 23.36,
            "unit": "ns/op",
            "extra": "154503553 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 1,
            "unit": "B/op",
            "extra": "154503553 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "154503553 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 35.96,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99675028 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 35.96,
            "unit": "ns/op",
            "extra": "99675028 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99675028 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99675028 times\n4 procs"
          }
        ]
      },
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
          "id": "016e80d0b5847075a59ba82f0c96e3dfcd59a3f1",
          "message": "doc: fix benchmark history link path (dev/bench not dev/benchmark)",
          "timestamp": "2026-04-23T10:19:10+08:00",
          "tree_id": "b20d91c2bd43f36cd112446d3a0e50c14dbecad4",
          "url": "https://github.com/maxence2997/carousel/commit/016e80d0b5847075a59ba82f0c96e3dfcd59a3f1"
        },
        "date": 1776910798172,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.054,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.054,
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
            "extra": "983472788 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 3.646,
            "unit": "ns/op",
            "extra": "983472788 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "983472788 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "983472788 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.058,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.058,
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
            "value": 2361,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1529331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2361,
            "unit": "ns/op",
            "extra": "1529331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1529331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1529331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 11.94,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "302961495 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 11.94,
            "unit": "ns/op",
            "extra": "302961495 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "302961495 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "302961495 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 21.46,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "168017541 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 21.46,
            "unit": "ns/op",
            "extra": "168017541 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "168017541 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "168017541 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 32.22,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 32.22,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      }
    ]
  }
}