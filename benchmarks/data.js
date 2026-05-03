window.BENCHMARK_DATA = {
  "lastUpdate": 1777809039107,
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
          "id": "9793edc9a1d2d4f69edab1670907e0034d0df270",
          "message": "ci: skip benchmark run on markdown-only changes",
          "timestamp": "2026-04-23T10:24:05+08:00",
          "tree_id": "177e4c926ad21cca60c411f0bea4e1fbacd39218",
          "url": "https://github.com/maxence2997/carousel/commit/9793edc9a1d2d4f69edab1670907e0034d0df270"
        },
        "date": 1776911095130,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.153,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.153,
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
            "value": 3.671,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "981822825 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 3.671,
            "unit": "ns/op",
            "extra": "981822825 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "981822825 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "981822825 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.124,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.124,
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
            "value": 2745,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1286192 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2745,
            "unit": "ns/op",
            "extra": "1286192 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1286192 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1286192 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 11.95,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "303987469 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 11.95,
            "unit": "ns/op",
            "extra": "303987469 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "303987469 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "303987469 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 21.13,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "170397406 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 21.13,
            "unit": "ns/op",
            "extra": "170397406 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "170397406 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "170397406 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 32.14,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 32.14,
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
          "id": "aaa8d1ae303a69b950614e5300e445ece0c17acf",
          "message": "chore: rename benchmark-badge.yml to benchmark.yml",
          "timestamp": "2026-04-23T10:48:18+08:00",
          "tree_id": "c90f4d9c6d2daf92eedc105d696e2c051dd9df7c",
          "url": "https://github.com/maxence2997/carousel/commit/aaa8d1ae303a69b950614e5300e445ece0c17acf"
        },
        "date": 1776912542219,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 5.269,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "683532808 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 5.269,
            "unit": "ns/op",
            "extra": "683532808 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "683532808 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "683532808 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush",
            "value": 4.223,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "852278444 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.223,
            "unit": "ns/op",
            "extra": "852278444 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "852278444 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "852278444 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.178,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.178,
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
            "value": 4034,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "903859 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 4034,
            "unit": "ns/op",
            "extra": "903859 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "903859 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "903859 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 10.69,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "327299592 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 10.69,
            "unit": "ns/op",
            "extra": "327299592 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "327299592 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "327299592 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 23.36,
            "unit": "ns/op\t       1 B/op\t       0 allocs/op",
            "extra": "154801603 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 23.36,
            "unit": "ns/op",
            "extra": "154801603 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 1,
            "unit": "B/op",
            "extra": "154801603 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "154801603 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 35.22,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99417265 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 35.22,
            "unit": "ns/op",
            "extra": "99417265 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99417265 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99417265 times\n4 procs"
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
          "id": "643e42d2d3664a8055c932409e3b7717b0851a39",
          "message": "doc: restructure docs — Quick Start back to README, benchmarks to per-type docs\n\n1.README — restore Quick Start for both types; Benchmarks section links to docs/\n2.docs/ringbuffer.md — add benchmark table at end\n3.docs/ringqueue.md — add benchmark table at end\n4.benchmark.yml — fail-on-alert: false, threshold 200%",
          "timestamp": "2026-04-23T11:03:52+08:00",
          "tree_id": "d08ed6fd0c15bbbcf2e10f6d33164392655a057b",
          "url": "https://github.com/maxence2997/carousel/commit/643e42d2d3664a8055c932409e3b7717b0851a39"
        },
        "date": 1776913478802,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3,
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
            "value": 3.665,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "987237021 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 3.665,
            "unit": "ns/op",
            "extra": "987237021 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "987237021 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "987237021 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.101,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.101,
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
            "value": 2430,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1487260 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2430,
            "unit": "ns/op",
            "extra": "1487260 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1487260 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1487260 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 12.09,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "300216312 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 12.09,
            "unit": "ns/op",
            "extra": "300216312 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "300216312 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "300216312 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 21.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "164655213 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 21.64,
            "unit": "ns/op",
            "extra": "164655213 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "164655213 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "164655213 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 32.15,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 32.15,
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
      },
      {
        "commit": {
          "author": {
            "email": "72722415+maxence2997@users.noreply.github.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d87f499bd82679b8103de450a0fd0c439f12ed14",
          "message": "Merge pull request #4 from maxence2997/chore/repo-tooling-release\n\nchore: add repo maintenance tooling",
          "timestamp": "2026-04-28T21:07:25+08:00",
          "tree_id": "d7ddfbc8a7be2a943ea880954549b9cdf5e4f83d",
          "url": "https://github.com/maxence2997/carousel/commit/d87f499bd82679b8103de450a0fd0c439f12ed14"
        },
        "date": 1777381699339,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.173,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.173,
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
            "value": 4.219,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "853503084 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.219,
            "unit": "ns/op",
            "extra": "853503084 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "853503084 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "853503084 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.173,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.173,
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
            "value": 2661,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1365867 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2661,
            "unit": "ns/op",
            "extra": "1365867 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1365867 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1365867 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 10.98,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "329039349 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 10.98,
            "unit": "ns/op",
            "extra": "329039349 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "329039349 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "329039349 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 19.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "185834204 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 19.24,
            "unit": "ns/op",
            "extra": "185834204 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "185834204 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "185834204 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 36.44,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 36.44,
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
      },
      {
        "commit": {
          "author": {
            "email": "72722415+maxence2997@users.noreply.github.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cb9bb1600e908be756f4e564afb144d6fe359e2e",
          "message": "Merge pull request #5 from maxence2997/codex/node24-actions\n\nchore: move workflow actions to node24",
          "timestamp": "2026-04-28T21:18:08+08:00",
          "tree_id": "27256f83762a2f2f00effaaa600f2eba158026d5",
          "url": "https://github.com/maxence2997/carousel/commit/cb9bb1600e908be756f4e564afb144d6fe359e2e"
        },
        "date": 1777382353423,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.207,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.207,
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
            "value": 4.223,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "852346150 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.223,
            "unit": "ns/op",
            "extra": "852346150 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "852346150 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "852346150 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.177,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.177,
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
            "value": 2632,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1376992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2632,
            "unit": "ns/op",
            "extra": "1376992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1376992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1376992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 10.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "337513855 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 10.67,
            "unit": "ns/op",
            "extra": "337513855 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "337513855 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "337513855 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 19.15,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "189894950 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 19.15,
            "unit": "ns/op",
            "extra": "189894950 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "189894950 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "189894950 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 35.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99951992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 35.87,
            "unit": "ns/op",
            "extra": "99951992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99951992 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99951992 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "72722415+maxence2997@users.noreply.github.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8b89831f26f20f7ddc403692080c2ba5f8cdb72e",
          "message": "Merge pull request #6 from maxence2997/fix/drain-bulk-path\n\nfix: speed up RingBuffer drain and clear",
          "timestamp": "2026-04-28T22:42:22+08:00",
          "tree_id": "eaf41602da29dd7be94c7041d60a40852c25d6f8",
          "url": "https://github.com/maxence2997/carousel/commit/8b89831f26f20f7ddc403692080c2ba5f8cdb72e"
        },
        "date": 1777387407526,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.175,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.175,
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
            "value": 4.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "844403331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.24,
            "unit": "ns/op",
            "extra": "844403331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "844403331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "844403331 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.181,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.181,
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
            "value": 2450,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1440744 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2450,
            "unit": "ns/op",
            "extra": "1440744 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1440744 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1440744 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 11.33,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "318189100 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 11.33,
            "unit": "ns/op",
            "extra": "318189100 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "318189100 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "318189100 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 20.09,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "184401806 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 20.09,
            "unit": "ns/op",
            "extra": "184401806 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "184401806 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "184401806 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 36.35,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "98226902 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 36.35,
            "unit": "ns/op",
            "extra": "98226902 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "98226902 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "98226902 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "72722415+maxence2997@users.noreply.github.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "91117754ac794d5eb235e7bd512a79b78552f27c",
          "message": "Merge pull request #7 from maxence2997/chore/ci-single-check\n\nchore: collapse CI into single check job",
          "timestamp": "2026-04-28T22:59:30+08:00",
          "tree_id": "b84b090bbb9afa663105d481f60e2a836ca4eeb1",
          "url": "https://github.com/maxence2997/carousel/commit/91117754ac794d5eb235e7bd512a79b78552f27c"
        },
        "date": 1777388423399,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.174,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.174,
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
            "value": 4.316,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "830590651 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.316,
            "unit": "ns/op",
            "extra": "830590651 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "830590651 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "830590651 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.221,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.221,
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
            "value": 2321,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1527946 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2321,
            "unit": "ns/op",
            "extra": "1527946 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1527946 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1527946 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 11.18,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "322171346 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 11.18,
            "unit": "ns/op",
            "extra": "322171346 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "322171346 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "322171346 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 19.41,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "184946655 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 19.41,
            "unit": "ns/op",
            "extra": "184946655 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "184946655 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "184946655 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 36.19,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99638588 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 36.19,
            "unit": "ns/op",
            "extra": "99638588 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99638588 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99638588 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "72722415+maxence2997@users.noreply.github.com",
            "name": "Maxence Yang",
            "username": "maxence2997"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "996e394c1f4710a57cbb9e51b6e7d1e50a44a7e8",
          "message": "Merge pull request #8 from maxence2997/fix/bench-makefile-failures\n\nfix: propagate failures in bench-ci and bench-sync",
          "timestamp": "2026-05-03T19:49:51+08:00",
          "tree_id": "0442c2c4c5e7a8d76bc01a60e905388c0bd4bd4d",
          "url": "https://github.com/maxence2997/carousel/commit/996e394c1f4710a57cbb9e51b6e7d1e50a44a7e8"
        },
        "date": 1777809038599,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkRingBuffer_Push",
            "value": 3.169,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Push - ns/op",
            "value": 3.169,
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
            "value": 4.216,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "852045124 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - ns/op",
            "value": 4.216,
            "unit": "ns/op",
            "extra": "852045124 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "852045124 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_ForcePush - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "852045124 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop",
            "value": 3.171,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Pop - ns/op",
            "value": 3.171,
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
            "value": 2415,
            "unit": "ns/op\t    6528 B/op\t       1 allocs/op",
            "extra": "1498431 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - ns/op",
            "value": 2415,
            "unit": "ns/op",
            "extra": "1498431 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - B/op",
            "value": 6528,
            "unit": "B/op",
            "extra": "1498431 times\n4 procs"
          },
          {
            "name": "BenchmarkRingBuffer_Drain - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1498431 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue",
            "value": 11.16,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "322424636 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - ns/op",
            "value": 11.16,
            "unit": "ns/op",
            "extra": "322424636 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "322424636 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ForceEnqueue - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "322424636 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer",
            "value": 19.76,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "183313878 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - ns/op",
            "value": 19.76,
            "unit": "ns/op",
            "extra": "183313878 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "183313878 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_ProducerConsumer - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "183313878 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel",
            "value": 35.73,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99431906 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - ns/op",
            "value": 35.73,
            "unit": "ns/op",
            "extra": "99431906 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99431906 times\n4 procs"
          },
          {
            "name": "BenchmarkRingQueue_Parallel - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99431906 times\n4 procs"
          }
        ]
      }
    ]
  }
}