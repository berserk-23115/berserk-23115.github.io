export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime: string;
  tags: string[];
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "quantizing-llms-hpc-cpus",
    title: "Quantizing LLMs for Low-Resource HPC CPUs: Lessons from HiPeC",
    date: "2025-11-14",
    description:
      "How we achieved 87.25% accuracy on HPCorpus using ONNX Runtime, Grid-Ada LoRA fine-tuning, and GGUF compression on CPU-only cluster nodes.",
    readingTime: "6 min read",
    tags: ["LLM", "HPC", "Quantization", "ONNX", "OpenMP"],
    category: "Systems & AI",
    content: `
Deploying modern language models in high-performance computing (HPC) environments presents a paradox: while HPC clusters possess immense parallel compute power, dedicated GPU nodes are heavily contested, expensive, and often queued for days. For many batch analysis tasks—such as code synthesis or log classification—relying entirely on GPU availability stalls workflows.

At HiPeC (High Performance Computing Lab, IIIT Delhi), our goal was to optimize transformer inference specifically for CPU architectures without sacrificing accuracy.

### The Optimization Pipeline

Our target benchmark was **HPCorpus**, a comprehensive dataset of parallel computing source code (OpenMP, MPI, and CUDA). Standard 16-bit float evaluation of open-weight models proved too slow for interactive usage. We attacked this across three fronts:

1. **Grid-Ada LoRA Fine-Tuning**: Rather than uniform parameter adaptation, we partitioned low-rank update matrices across parameter blocks based on gradient sensitivity grids.
2. **GGUF Multi-Level Quantization**: We compressed weights down to 4-bit and 5-bit representations, isolating sensitive attention projection matrices in higher bit-depths.
3. **ONNX Runtime + OpenMP Core Affinity**: We converted the fine-tuned weights into ONNX format and tuned thread pinning across physical NUMA nodes to minimize cross-socket cache thrashing.

### Results & Takeaways

The combination achieved **87.25% accuracy on HPCorpus**, matching unquantized FP16 checkpoints while achieving a 4.2× reduction in memory footprint and sustaining sub-50ms per-token latency on standard Intel Xeon CPU nodes.

Moving compute closer to the memory hierarchy and understanding cache line contention remains the most effective lever in production systems engineering.
    `,
  },
  {
    slug: "cuda-parallel-video-kernels",
    title: "Writing Custom CUDA Kernels for Real-Time Parallel Video Filters",
    date: "2025-09-20",
    description:
      "Deep dive into 2D shared memory tiling, thread divergence mitigation, and CUDA stream pipelining for high-throughput video processing.",
    readingTime: "5 min read",
    tags: ["CUDA", "C++", "GPU", "Parallel Computing"],
    category: "GPU Compute",
    content: `
Video processing is an inherently parallel domain: every frame comprises millions of independent pixels, and most spatial operations (such as Sobel edge detection, Gaussian blurs, and bilateral smoothing) exhibit strong 2D spatial locality.

However, naive CUDA implementations that read pixel neighborhoods directly from device global memory quickly saturate memory bandwidth, resulting in poor hardware utilization.

### Shared Memory Tiling & Halo Regions

To maximize memory efficiency, our capstone processor partitions each frame into 2D tiles (e.g., 16×16 pixels) mapped to CUDA thread blocks. 

Because filter kernels (like a 5×5 convolution) require pixels outside the primary tile—the **halo region**—we allocate shared memory with an apron:

\`\`\`cpp
__shared__ float s_Tile[TILE_H + 2 * RADIUS][TILE_W + 2 * RADIUS];
\`\`\`

Each thread loads its primary pixel into shared memory, while edge threads cooperatively fetch halo boundary pixels. Once a \`__syncthreads()\` barrier completes, all filter computations operate purely on on-chip SRAM at negligible latency.

### Overlapping Memory Transfers with Streams

PCIe bus transfer between host and device is the primary bottleneck for continuous video feeds. By allocating **page-locked (pinned) host memory** and multiplexing across multiple \`cudaStream_t\` queues, we pipeline:

- Transferring Frame $N+1$ from Host to Device
- Executing Convolution Kernel on Frame $N$
- Transferring Frame $N-1$ from Device to Host

This concurrent pipeline sustains uninterrupted 60+ FPS processing on high-resolution streams.
    `,
  },
  {
    slug: "zero-knowledge-storage-rust-tauri",
    title: "Zero-Knowledge Storage: Implementing XChaCha20-Poly1305 in Rust & Tauri",
    date: "2025-08-05",
    description:
      "Designing client-side authenticated encryption, key derivation, and ephemeral memory wiping for KryptVault.",
    readingTime: "7 min read",
    tags: ["Cryptography", "Rust", "Security", "Tauri"],
    category: "Security",
    content: `
When building KryptVault, our core security invariant was simple: **the server must never be able to decrypt user data, even under complete infrastructure compromise.**

### Why XChaCha20-Poly1305?

Standard AES-GCM requires strict nonce uniqueness. If a 96-bit nonce is ever reused under the same key, catastrophic key recovery is possible. In a distributed multi-device client environment, managing 96-bit nonces without central coordination is error-prone.

We chose **XChaCha20-Poly1305** because it features a **192-bit extended nonce**. With 192 bits of entropy, nonces can be generated safely using a cryptographically secure random number generator (CSPRNG) with negligible collision probability across trillions of encryptions.

### Architecture with Tauri & Rust

Rather than executing cryptographic routines in JavaScript where garbage collection may leave plaintext keys lingering in heap memory, KryptVault executes all cryptographic operations inside a compiled Rust process:

1. **Argon2id Key Derivation**: Master passphrases derive master keys using high-memory Argon2id parameters.
2. **Libsodium Key Wrapping**: Subkeys are derived per folder and wrapped using authenticated AEAD headers.
3. **Zeroization**: Sensitive byte slices implement the \`Zeroize\` trait, forcing explicit memory wiping upon drop.

The result is a desktop storage client that is both exceptionally fast and provably secure.
    `,
  },
];
