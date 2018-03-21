#!/usr/bin/env python3.6
"""
This file runs in the flyte/rancher-tools docker image, where rancher_tools
is preinstalled.
"""
import argparse
from os import environ as env

import rancher_tools as rt


def main():
    p = argparse.ArgumentParser()
    p.add_argument('env')
    p.add_argument('stack')
    args = p.parse_args()

    tag = env['BITBUCKET_TAG']

    print(f'Getting stack {args.stack!r}..')
    stack = rt.get_stack_by_name(args.env, args.stack)

    print('Getting load balancer..')
    lb = rt.get_svc_by_stack_and_name(stack, 'lb')

    print('Getting existing frontend service..')
    old_frontend = rt.get_lb_svc_target(lb, 443, '/')

    new_frontend_name = f'frontend-{tag}'.replace('.', '-')
    print(f'Creating new service {new_frontend_name!r}..')
    new_frontend = rt.clone_svc(
        old_frontend,
        new_frontend_name,
        new_image=f'registry-maf.0x07.co.uk:5000/maf-portfolio:{tag}'
    )

    print('Waiting for new service to become active..')
    new_frontend = rt.await_active(new_frontend, timeout=60)

    print('Updating load balancer to use new service..')
    lb = rt.change_lb_svc_target(lb, 443, '/', new_frontend['id'])

    print('Finished!')


if __name__ == '__main__':
    main()
