import { spawn, type ChildProcess } from 'node:child_process';

const children: ChildProcess[] = [];

function run(command: string, args: string[]) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
  });

  children.push(child);
  return child;
}

function shutdown(code = 0) {
  for (const child of children) {
    child.kill('SIGTERM');
  }

  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

run('yarn', ['server:dev']);
run('yarn', ['dev']);
